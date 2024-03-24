"use client";

import { Loader2, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearching, startTransition] = useTransition();
  const router = useRouter();

  const search = () => {
    startTransition(() => {
      router.push(`/search?query=${query}`);
    });
  };

  return (
    <div className="relative w-full h-14 flex flex-col bg-white">
      <div className="relative h-14 z-10 rounded-md">
        <Input
          disabled={isSearching}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              inputRef?.current?.blur();
            }
            if (e.key === "Enter") {
              search();
            }
          }}
          className="absolute inset-0 h-full"
        />
        <Button
          disabled={isSearching}
          size={"sm"}
          className="absolute right-0 inset-y-0 h-full rounded-l-none"
          onClick={search}
        >
          {isSearching ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <SearchIcon className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
