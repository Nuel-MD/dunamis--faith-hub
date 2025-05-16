"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Edit, Trash2, Plus, LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { getMetadataFromLink } from "@/lib/metadata";
import { useToast } from "@/components/ui/use-toast";
import { resourcesApi, Resource, PaginatedResponse } from "@/lib/api/resources";
import { ErrorBoundary } from "@/components/error-boundary";
import { LoadingSpinner } from "@/components/loading-spinner";

const CATEGORIES = ["sermon", "worship", "book", "movie"] as const;
type Category = (typeof CATEGORIES)[number];

export default function AdminDashboard() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resources, setResources] = useState<Resource[]>([]);
  const [pagination, setPagination] = useState<Omit<
    PaginatedResponse<Resource>,
    "docs"
  > | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category>("sermon");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentResource, setCurrentResource] = useState<Partial<Resource>>({
    title: "",
    description: "",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "",
    category: "sermon",
    featured: false,
  });
  const [isMetadataLoading, setIsMetadataLoading] = useState(false);
  const { toast } = useToast();

  const fetchResources = async () => {
    try {
      setIsLoading(true);
      const response = await resourcesApi.getResources({
        category: currentCategory,
      });
      setResources(response.docs);
      const { docs, ...paginationData } = response;
      setPagination(paginationData);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load resources",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [currentCategory]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    router.push("/admin");
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentResource({
      title: "",
      description: "",
      imageUrl: "/placeholder.svg?height=400&width=600",
      externalLink: "",
      category: currentCategory,
      featured: false,
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (resource: Resource) => {
    setIsEditing(true);
    setCurrentResource(resource);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) {
      return;
    }

    try {
      await resourcesApi.deleteResource(id);
      toast({
        title: "Success",
        description: "Resource deleted successfully",
      });
      await fetchResources();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete resource",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !currentResource.title ||
      !currentResource.description ||
      !currentResource.externalLink
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isEditing && currentResource.id) {
        await resourcesApi.updateResource(currentResource.id, currentResource);
        toast({
          title: "Success",
          description: "Resource updated successfully",
        });
      } else {
        await resourcesApi.createResource(
          currentResource as Omit<Resource, "id">
        );
        toast({
          title: "Success",
          description: "Resource created successfully",
        });
      }

      await fetchResources();
      setIsEditModalOpen(false);
      setIsAddModalOpen(false);
      setCurrentResource({
        title: "",
        description: "",
        imageUrl: "/placeholder.svg?height=400&width=600",
        externalLink: "",
        category: currentCategory,
        featured: false,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save resource",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentResource((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: Category) => {
    setCurrentResource((prev) => ({ ...prev, category: value }));
  };

  const handleExternalLinkChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const url = e.target.value;
    setCurrentResource((prev) => ({ ...prev, externalLink: url }));

    if (!url) return;

    setIsMetadataLoading(true);
    try {
      const metadata = await getMetadataFromLink(url);
      if (metadata) {
        setCurrentResource((prev) => ({
          ...prev,
          title: metadata.title || prev.title,
          description: metadata.description || prev.description,
          imageUrl: metadata.imageUrl || prev.imageUrl,
        }));
        toast({
          title: "Success",
          description: "Successfully loaded information from the link",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to load information from the link. Please fill in manually.",
        variant: "destructive",
      });
    } finally {
      setIsMetadataLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        </div>

        <Tabs
          value={currentCategory}
          onValueChange={(value) => setCurrentCategory(value as Category)}
        >
          <TabsList className="mb-6">
            {CATEGORIES.map((category) => (
              <TabsTrigger key={`trigger-${category}`} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {CATEGORIES.map((category) => (
            <TabsContent key={`content-${category}`} value={category}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Manage{" "}
                    {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                    Resources
                  </CardTitle>
                  <CardDescription>
                    View, edit, or delete resources in the {category} category.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <Button
                      onClick={handleAddNew}
                      className="flex items-center gap-2"
                    >
                      <Plus size={16} />
                      <span>Add New Resource</span>
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Featured</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {resources
                          .filter((resource) => resource.category === category)
                          .map((resource) => (
                            <TableRow key={`row-${resource.id}`}>
                              <TableCell className="font-medium">
                                {resource.title}
                              </TableCell>
                              <TableCell className="max-w-xs truncate">
                                {resource.description}
                              </TableCell>
                              <TableCell>{resource.category}</TableCell>
                              <TableCell>
                                {resource.featured ? (
                                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                                    Featured
                                  </span>
                                ) : (
                                  "No"
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleEdit(resource)}
                                  >
                                    <Edit size={16} />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleDelete(resource.id)}
                                    className="text-destructive hover:text-destructive"
                                  >
                                    <Trash2 size={16} />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <Dialog
          open={isEditing ? isEditModalOpen : isAddModalOpen}
          onOpenChange={isEditing ? setIsEditModalOpen : setIsAddModalOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Resource" : "Add New Resource"}
              </DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Update the details of an existing resource."
                  : "Fill in the details to add a new resource to your collection."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={currentResource.title}
                  onChange={handleInputChange}
                  placeholder="Resource title"
                  required
                  disabled={isMetadataLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={currentResource.category}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={currentResource.description}
                  onChange={handleInputChange}
                  placeholder="Resource description"
                  required
                  rows={4}
                  disabled={isMetadataLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={currentResource.imageUrl}
                  onChange={handleInputChange}
                  placeholder="URL for resource image"
                  required
                  disabled={isMetadataLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="externalLink">External Link</Label>
                <Input
                  id="externalLink"
                  name="externalLink"
                  value={currentResource.externalLink}
                  onChange={handleExternalLinkChange}
                  placeholder="Enter URL (YouTube, Spotify, or book link)"
                  disabled={isMetadataLoading}
                />
                {isMetadataLoading && (
                  <p className="text-sm text-muted-foreground">
                    Loading information from link...
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={currentResource.featured}
                  onCheckedChange={(checked) =>
                    setCurrentResource((prev) => ({
                      ...prev,
                      featured: checked === true,
                    }))
                  }
                />
                <Label
                  htmlFor="featured"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Feature this resource on the homepage
                </Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    isEditing
                      ? setIsEditModalOpen(false)
                      : setIsAddModalOpen(false)
                  }
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isMetadataLoading}>
                  {isEditing ? "Update Resource" : "Add Resource"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </ErrorBoundary>
  );
}
