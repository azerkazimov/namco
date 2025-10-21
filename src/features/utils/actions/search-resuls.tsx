import { CommandGroup, CommandItem } from "@/components/ui/command";
import { ProductProps } from "@/features/helpers/interfaces/products";

interface SearchResultprops {
  results: ProductProps[];
  onSelect: (product: ProductProps) => void;
}

export default function SearchResult({ results, onSelect }: SearchResultprops) {
  return (
    <CommandGroup heading="Products">
      {results.map((product) => (
        <CommandItem
          key={product.id}
          value={product.name}
          onSelect={() => onSelect(product)}
        >
          <span>{product.name}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
