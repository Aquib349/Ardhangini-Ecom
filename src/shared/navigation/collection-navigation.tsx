import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../components/ui/hover-card";
import { useEffect, useState } from "react";
import { apiClient, handleApiError } from "../../services/axios.service";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../hooks/use-global";

interface Collection {
  id: string;
  name: string;
  description: string;
}

function CollectionNavigation({ item }: { item: string }) {
  const { filterCollection } = useGlobal();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isHoverCardOpen, setHoverCardOpen] = useState(false);
  const navigate = useNavigate();

  // function to get all the collections
  async function allCollections() {
    try {
      const response = await apiClient.get("/product-collection");
      setCollections(response.data);
    } catch (error) {
      handleApiError(error);
      console.log(error);
    }
  }

  useEffect(() => {
    allCollections();
  }, []);

  return (
    <>
      <HoverCard open={isHoverCardOpen} onOpenChange={setHoverCardOpen}>
        <HoverCardTrigger asChild>
          <span
            className="cursor-pointer"
            onMouseEnter={() => setHoverCardOpen(true)}
          >
            {item}
          </span>
        </HoverCardTrigger>
        <HoverCardContent
          className="w-[500px] mt-3"
          onMouseLeave={() => setHoverCardOpen(false)}
        >
          <div className="grid grid-cols-2">
            {collections?.map((collection) => (
              <div
                key={collection.id}
                className="hover:bg-slate-200 hover:rounded-lg p-4"
                onClick={() => {
                  filterCollection(collection?.name);
                  navigate(
                    `/collections`
                  );
                  setHoverCardOpen(false);
                }}
              >
                <h1 className="font-medium">
                  {(collection?.name).charAt(0).toUpperCase() +
                    collection.name.slice(1)}
                </h1>
                <p className="text-xs text-gray-600">
                  {collection?.description}
                </p>
              </div>
            ))}
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}

export default CollectionNavigation;
