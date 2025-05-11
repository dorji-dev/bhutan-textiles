"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Package, Truck, CheckCircle } from "lucide-react";
import { format } from "date-fns";

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-001",
    date: new Date("2024-03-15"),
    total: 449.98,
    status: "delivered",
    items: [
      {
        id: 1,
        name: "Traditional Kira",
        price: 359.99,
        quantity: 1,
        image: "https://images.pexels.com/photos/19287537/pexels-photo-19287537/free-photo-of-woman-holding-fabric.jpeg",
      },
      {
        id: 2,
        name: "Ceremonial Scarf",
        price: 89.99,
        quantity: 1,
        image: "https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg",
      },
    ],
    shipping: {
      address: "123 Main St",
      city: "New York",
      country: "USA",
      postalCode: "10001",
    },
    tracking: "1Z999AA1234567890",
  },
  {
    id: "ORD-002",
    date: new Date("2024-03-10"),
    total: 499.99,
    status: "processing",
    items: [
      {
        id: 3,
        name: "Thangka Painting",
        price: 499.99,
        quantity: 1,
        image: "https://images.pexels.com/photos/19304177/pexels-photo-19304177/free-photo-of-buddhist-monastery-in-paro-bhutan.jpeg",
      },
    ],
    shipping: {
      address: "456 Park Ave",
      city: "Los Angeles",
      country: "USA",
      postalCode: "90001",
    },
  },
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isViewOrderOpen, setIsViewOrderOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "shipped":
        return "bg-yellow-100 text-yellow-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Package className="h-5 w-5" />;
      case "shipped":
        return <Truck className="h-5 w-5" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-accent py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-neutral-900 mb-2">
            My Orders
          </h1>
          <p className="text-neutral-600">
            Track and manage your orders
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>
              View the status and details of all your orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{format(order.date, "MMM d, yyyy")}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsViewOrderOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={isViewOrderOpen} onOpenChange={setIsViewOrderOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-neutral-600">Order ID</p>
                    <p className="font-medium">{selectedOrder.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-600">Order Date</p>
                    <p className="font-medium">
                      {format(selectedOrder.date, "MMM d, yyyy")}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Items</h3>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item: any) => (
                      <div key={item.id} className="flex gap-4 py-3 border-b border-border/50">
                        <div className="h-20 w-20 bg-accent rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-neutral-600">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm font-medium">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Shipping Address</h3>
                    <div className="text-sm text-neutral-600">
                      <p>{selectedOrder.shipping.address}</p>
                      <p>{selectedOrder.shipping.city}</p>
                      <p>{selectedOrder.shipping.country}</p>
                      <p>{selectedOrder.shipping.postalCode}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Subtotal</span>
                        <span className="font-medium">${selectedOrder.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Shipping</span>
                        <span className="font-medium">Free</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-border">
                        <span className="font-medium">Total</span>
                        <span className="font-medium">${selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedOrder.tracking && (
                  <div>
                    <h3 className="font-medium mb-2">Tracking Information</h3>
                    <p className="text-sm text-neutral-600">
                      Tracking Number: {selectedOrder.tracking}
                    </p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}