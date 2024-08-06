"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { groupNamesStore } from "@/store/groupNamesStore"

interface props{
    setGroupId: React.Dispatch<React.SetStateAction<any>>;
}
const SearchGroup: React.FC<props> = ({ setGroupId }) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const { groupNames } = groupNamesStore()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {value
            ? groupNames.data.find((group: any) => group._id === value)?.groupName
            : "Select group..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search group..." />
          <CommandList>
            <CommandEmpty>No group found.</CommandEmpty>
            <CommandGroup>
              {groupNames && groupNames.data.map((group: any) => (
                <CommandItem
                  key={group.groupName}
                  value={group._id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setGroupId(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === group.groupName ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {group.groupName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SearchGroup