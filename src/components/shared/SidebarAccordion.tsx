import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

interface ISidebarAccordion {
  value: string;
  trigger: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const SidebarAccordion = ({
  value,
  trigger,
  children,
  icon,
}: ISidebarAccordion) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={value}>
        <AccordionTrigger>
          <p className="flex gap-2 items-center">
            {icon}
            {trigger}
          </p>
        </AccordionTrigger>
        <AccordionContent>
          <div className="ml-4">{children}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarAccordion;
