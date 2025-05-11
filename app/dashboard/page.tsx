"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { createProduct, getProducts, updateProduct, deleteProduct } from "@/lib/products";
import { uploadProductImages } from "@/lib/storage";
import { toast } from "sonner";

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(0, "Price must be greater than 0"),
  category: z.enum(["textiles", "paintings"]),
  stock: z.coerce.number().min(0, "Stock must be greater than or equal to 0"),
  status: z.enum(["active", "inactive"]),
  images: z.array(z.string()).min(1, "At least one image is required"),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function DashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isViewProductOpen, setIsViewProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImages, setUploadingImages] = useState(false);

  const addProductForm = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "textiles",
      stock: 0,
      status: "active",
      images: [],
    },
  });

  const editProductForm = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "textiles",
      stock: 0,
      status: "active",
      images: [],
    },
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load products");
    }
  };

  const handleAddImage = (isEdit: boolean) => {
    if (isEdit) {
      if (!editImageUrl) return;
      const currentImages = editProductForm.getValues("images");
      editProductForm.setValue("images", [...currentImages, editImageUrl]);
      setEditImageUrl("");
    } else {
      if (!newImageUrl) return;
      const currentImages = addProductForm.getValues("images");
      addProductForm.setValue("images", [...currentImages, newImageUrl]);
      setNewImageUrl("");
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    try {
      setUploadingImages(true);
      const urls = await uploadProductImages(files);
      
      if (isEdit) {
        const currentImages = editProductForm.getValues("images");
        editProductForm.setValue("images", [...currentImages, ...urls]);
      } else {
        const currentImages = addProductForm.getValues("images");
        addProductForm.setValue("images", [...currentImages, ...urls]);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to upload images");
    } finally {
      setUploadingImages(false);
      // Reset the file input
      if (isEdit) {
        if (editFileInputRef.current) editFileInputRef.current.value = '';
      } else {
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number, isEdit: boolean) => {
    if (isEdit) {
      const currentImages = editProductForm.getValues("images");
      editProductForm.setValue(
        "images",
        currentImages.filter((_, i) => i !== index)
      );
    } else {
      const currentImages = addProductForm.getValues("images");
      addProductForm.setValue(
        "images",
        currentImages.filter((_, i) => i !== index)
      );
    }
  };

  const handleAddProduct = async (values: ProductFormValues) => {
    try {
      setIsLoading(true);
      await createProduct(values);
      toast.success("Product created successfully");
      setIsAddProductOpen(false);
      addProductForm.reset();
      loadProducts();
    } catch (error: any) {
      toast.error(error.message || "Failed to create product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = async (values: ProductFormValues) => {
    if (!selectedProduct) return;

    try {
      setIsLoading(true);
      await updateProduct(selectedProduct.id, values);
      toast.success("Product updated successfully");
      setIsEditProductOpen(false);
      editProductForm.reset();
      loadProducts();
    } catch (error: any) {
      toast.error(error.message || "Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
      loadProducts();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete product");
    }
  };

  const handleEditOpen = (product: any) => {
    setSelectedProduct(product);
    editProductForm.reset({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      status: product.status,
      images: product.images,
    });
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
              <Form {...addProductForm}>
                <form onSubmit={addProductForm.handleSubmit(handleAddProduct)} className="space-y-4 mt-4">
                  <FormField
                    control={addProductForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addProductForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="textiles">Textiles</SelectItem>
                            <SelectItem value="paintings">Paintings</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addProductForm.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter price" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addProductForm.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter stock quantity" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addProductForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter product description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addProductForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addProductForm.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Images</FormLabel>
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <input
                              type="file"
                              ref={fileInputRef}
                              multiple
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileSelect(e, false)}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={uploadingImages}
                            >
                              {uploadingImages ? "Uploading..." : "Select Images"}
                            </Button>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            {field.value.map((url, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={url}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-24 object-cover rounded-lg"
                                />
                                <Button
                                  type="button"
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
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsAddProductOpen(false);
                        addProductForm.reset();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Adding..." : "Add Product"}
                    </Button>
                  </div>
                </form>
              </Form>
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
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
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
              <Form {...editProductForm}>
                <form onSubmit={editProductForm.handleSubmit(handleEditProduct)} className="space-y-4 mt-4">
                  <FormField
                    control={editProductForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editProductForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="textiles">Textiles</SelectItem>
                            <SelectItem value="paintings">Paintings</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editProductForm.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter price" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editProductForm.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter stock quantity" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editProductForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter product description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editProductForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editProductForm.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Images</FormLabel>
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <input
                              type="file"
                              ref={editFileInputRef}
                              multiple
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileSelect(e, true)}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => editFileInputRef.current?.click()}
                              disabled={uploadingImages}
                            >
                              {uploadingImages ? "Uploading..." : "Select Images"}
                            </Button>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            {field.value.map((url, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={url}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-24 object-cover rounded-lg"
                                />
                                <Button
                                  type="button"
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
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditProductOpen(false);
                        editProductForm.reset();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}