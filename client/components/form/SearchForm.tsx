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
import { FormNamesStore } from "@/store/form/formNamesStore"

interface Props {
  setFormId: React.Dispatch<React.SetStateAction<any>>;
}

const SearchForm: React.FC<Props> = ({ setFormId }) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const { formNames } = FormNamesStore()

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
            ? formNames.data.find((form: any) => form._id === value)?.formName
            : "Select form..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search form..." />
          <CommandList>
            <CommandEmpty>No form found.</CommandEmpty>
            <CommandGroup>
              {formNames && formNames.data.map((form: any) => (
                <CommandItem
                  key={form.formName}
                  value={form._id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setFormId(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === form.formName ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {form.formName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SearchForm