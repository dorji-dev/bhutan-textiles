"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Pencil, 
  Eye, 
  Trash2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Package,
  Tag,
  Layers,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockProducts = [
  {
    id: "1",
    name: "Traditional Kira",
    category: "textiles",
    price: 359.99,
    stock: 5,
    status: "active",
    description: "Handwoven traditional Bhutanese women's dress with intricate patterns. Each piece takes months to complete and features unique motifs that tell stories of Bhutanese culture and tradition.",
    dimensions: "2.5m x 1.5m",
    material: "Hand-spun silk and cotton",
    technique: "Traditional backstrap loom weaving",
    images: [
      "https://images.pexels.com/photos/19287537/pexels-photo-19287537/free-photo-of-woman-holding-fabric.jpeg",
      "https://images.pexels.com/photos/6192351/pexels-photo-6192351.jpeg",
    ],
  },
  {
    id: "2",
    name: "Thangka Painting",
    category: "paintings",
    price: 499.99,
    stock: 3,
    status: "active",
    description: "Traditional Buddhist scroll painting depicting deities, meticulously crafted using natural pigments and gold leaf. This piece showcases the intricate details and spiritual significance of Bhutanese religious art.",
    dimensions: "60cm x 90cm",
    material: "Natural pigments, gold leaf on cotton canvas",
    technique: "Traditional Thangka painting",
    images: [
      "https://images.pexels.com/photos/19304177/pexels-photo-19304177/free-photo-of-buddhist-monastery-in-paro-bhutan.jpeg",
      "https://images.pexels.com/photos/7486798/pexels-photo-7486798.jpeg",
    ],
  },
];

interface ImagePreview {
  url: string;
  file?: File;
}

export default function DashboardPage() {
  const [products] = useState(mockProducts);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isViewProductOpen, setIsViewProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [newImagePreviews, setNewImagePreviews] = useState<ImagePreview[]>([]);
  const [editImagePreviews, setEditImagePreviews] = useState<ImagePreview[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviews: ImagePreview[] = Array.from(files).map(file => ({
      url: URL.createObjectURL(file),
      file,
    }));

    if (isEdit) {
      setEditImagePreviews(prev => [...prev, ...newPreviews]);
    } else {
      setNewImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number, isEdit: boolean) => {
    if (isEdit) {
      setEditImagePreviews(prev => prev.filter((_, i) => i !== index));
    } else {
      setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddProductOpen(false);
    setNewImagePreviews([]);
  };

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditProductOpen(false);
    setEditImagePreviews([]);
  };

  const handleEditOpen = (product: any) => {
    setSelectedProduct(product);
    setEditImagePreviews(
      product.images.map((url: string) => ({ url }))
    );
    setIsEditProductOpen(true);
  };

  const nextImage = () => {
    if (selectedProduct) {
      setSelectedImageIndex((prev) => 
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const previousImage = () => {
    if (selectedProduct) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-accent py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-neutral-900">
              Artisan Dashboard
            </h1>
            <p className="text-neutral-600">
              Manage your products and view analytics
            </p>
          </div>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Add a new product to your collection
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddProduct} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Name</label>
                  <Input placeholder="Enter product name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="textiles">Textiles</SelectItem>
                      <SelectItem value="paintings">Paintings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price</label>
                  <Input type="number" placeholder="Enter price" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Stock</label>
                  <Input type="number" placeholder="Enter stock quantity" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Enter product description" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Images</label>
                  <Input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, false)}
                  />
                  {newImagePreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {newImagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview.url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6"
                            onClick={() => removeImage(index, false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddProductOpen(false);
                      setNewImagePreviews([]);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Product</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Products</CardTitle>
              <CardDescription>Your active listings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{products.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Sales</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$1,234</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Views</CardTitle>
              <CardDescription>Product page views</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">567</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Products</CardTitle>
            <CardDescription>
              Manage and monitor your product listings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Preview</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="h-12 w-12 rounded-lg overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="capitalize">{product.category}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell className="capitalize">{product.status}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsViewProductOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditOpen(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog 
          open={isViewProductOpen} 
          onOpenChange={(open) => {
            setIsViewProductOpen(open);
            if (!open) setSelectedImageIndex(0);
          }}
        >
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
            </DialogHeader>
            {selectedProduct && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-accent">
                    <img
                      src={selectedProduct.images[selectedImageIndex]}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    {selectedProduct.images.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                          onClick={previousImage}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                          onClick={nextImage}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {selectedProduct.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        className={cn(
                          "relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden",
                          selectedImageIndex === index && "ring-2 ring-primary"
                        )}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <img
                          src={image}
                          alt={`${selectedProduct.name} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-neutral-900">
                      {selectedProduct.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-2xl font-bold text-primary">
                        ${selectedProduct.price}
                      </span>
                      <span className={cn(
                        "px-2 py-1 text-xs font-medium rounded-full",
                        selectedProduct.status === "active" 
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      )}>
                        {selectedProduct.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-sm">
                    <p className="text-neutral-600">{selectedProduct.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-primary" />
                          <span className="font-medium">Stock</span>
                        </div>
                        <p className="mt-1">{selectedProduct.stock} units</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-primary" />
                          <span className="font-medium">Category</span>
                        </div>
                        <p className="mt-1 capitalize">{selectedProduct.category}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-primary" />
                        <CardTitle>Specifications</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-neutral-600">Dimensions</dt>
                          <dd className="font-medium">{selectedProduct.dimensions}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-neutral-600">Material</dt>
                          <dd className="font-medium">{selectedProduct.material}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-neutral-600">Technique</dt>
                          <dd className="font-medium">{selectedProduct.technique}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-primary" />
                        <CardTitle>Performance</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-neutral-600">Views</dt>
                          <dd className="font-medium">245</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-neutral-600">Sales</dt>
                          <dd className="font-medium">12</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-neutral-600">Revenue</dt>
                          <dd className="font-medium">${(selectedProduct.price * 12).toFixed(2)}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                Update your product information
              </DialogDescription>
            </DialogHeader>
            {selectedProduct && (
              <form onSubmit={handleEditProduct} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Name</label>
                  <Input
                    defaultValue={selectedProduct.name}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select defaultValue={selectedProduct.category}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="textiles">Textiles</SelectItem>
                      <SelectItem value="paintings">Paintings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price</label>
                  <Input
                    type="number"
                    defaultValue={selectedProduct.price}
                    placeholder="Enter price"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Stock</label>
                  <Input
                    type="number"
                    defaultValue={selectedProduct.stock}
                    placeholder="Enter stock quantity"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Enter product description" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Images</label>
                  <Input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, true)}
                  />
                  {editImagePreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {editImagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview.url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6"
                            onClick={() => removeImage(index, true)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditProductOpen(false);
                      setEditImagePreviews([]);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}