"use client";

import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";

export default function TestPage() {
  return (
    <div className="p-20">
      <Command className="w-[300px] border">
        <CommandInput placeholder="Type something..." />
        <CommandList>
          <CommandItem>Test 1</CommandItem>
          <CommandItem>Test 2</CommandItem>
        </CommandList>
      </Command>
    </div>
  );
}
