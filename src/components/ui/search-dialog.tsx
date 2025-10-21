"use client";

import * as React from "react";
import { IoSearchOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductProps } from "@/features/helpers/interfaces/products";
import { useRouter } from "next/navigation";

import { searchProducts } from "@/features/utils/actions/search-product";
import SearchResult from "@/features/utils/actions/search-resuls";
import SearchSuggestion from "@/features/utils/actions/search-suggestion";

export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<ProductProps[]>([]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Search handler with debounce
  React.useEffect(() => {
    const timerId = setTimeout(async () => {
      if (searchQuery) {
        try {
          const result = await searchProducts(searchQuery);
          setSearchResults(result);
        } catch (error) {
          console.error("Search failed:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    }, 250);
    return () => clearTimeout(timerId);
  }, [searchQuery]);

  const handleProductSelect = (product: ProductProps) => {
    router.push(product.path);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="border-none bg-white/30 w-[220px] cursor-pointer">
          <div className="flex items-center justify-between gap-2 w-full">
            <span>Search...</span>
            <IoSearchOutline className="h-4 w-4" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogTitle className="sr-only">Search products</DialogTitle>
        <Command>
          <CommandInput
            placeholder="Type a command or search..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            {searchQuery.trim() === "" ? (
              <SearchSuggestion />
            ) : searchResults.length > 0 ? (
              <SearchResult results={searchResults} onSelect={handleProductSelect}/>
            ) : (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
