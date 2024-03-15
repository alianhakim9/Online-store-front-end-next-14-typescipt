"use client";

import { Order } from "@/app/lib/definitions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import EmptyState from "../empty-state";
import OrderCard from "./card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  orders: Order[];
}

export default function OrderTabs({ orders }: Props) {
  const [status, setStatus] = useState("pending");
  const triggers = [
    {
      value: "pending",
      title: "Pending",
    },
    {
      value: "expired",
      title: "Expired",
    },
    {
      value: "completed",
      title: "Completed",
    },
  ];

  let filteredOrder: Order[] = orders.filter(
    (item) => item.status.toLowerCase() === status
  );

  return (
    <Tabs defaultValue="pending">
      <TabsList className="grid grid-cols-3 gap-2">
        {triggers.map((trigger) => (
          <TabsTrigger
            value={trigger.value}
            key={trigger.value}
            onClick={() => {
              setStatus(trigger.value);
            }}
          >
            {trigger.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {triggers.map((trigger) => (
        <TabsContent value={trigger.value} key={trigger.value}>
          {filteredOrder.length === 0 ? (
            <div className="flex items-center justify-center h-[50vh]">
              <EmptyState
                title={`order dengan status ${trigger.value} masih kosong`}
                mode="graphic"
              />
            </div>
          ) : (
            <ScrollArea className="h-[50vh] w-full">
              <div className="flex flex-col gap-2">
                {filteredOrder.map((order) => (
                  <OrderCard order={order} key={order.order_id} />
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
