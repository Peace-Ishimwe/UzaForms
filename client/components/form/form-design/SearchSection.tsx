import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';

interface SearchSectionProps {
    options: { label: string; value: string }[];
    onSelect: (value: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ options, onSelect }) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between w-full"
                >
                    {value ? options.find((option) => option.value === value)?.label : "Select Section"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search section..." />
                    <CommandList>
                        {options.length === 0 && <CommandItem>No section found.</CommandItem>}
                        {options.map((option) => (
                            <CommandItem
                                key={option.value}
                                onSelect={() => {
                                    setValue(option.label);
                                    onSelect(option.value);
                                    setOpen(false);
                                }}
                            >
                                {option.label}
                                {value === option.label && (
                                    <Check className="ml-auto h-4 w-4" />
                                )}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SearchSection;
