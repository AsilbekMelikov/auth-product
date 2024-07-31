import { useCallback } from "react";
import { useToast } from "../../@/components/ui/use-toast";

const useFetch = () => {
  const { toast } = useToast();
  type bodyType = BodyInit | null | undefined;

  const request = useCallback(
    async (
      url: string,
      method = "GET",
      body: bodyType = null,
      headers = { "Content-type": "application/json" }
    ) => {
      const response = await fetch(url, { method, body, headers });
      try {
        if (!response.ok) {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        }
        const data = await response.json();
        return data;
      } catch (e) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        console.log(e);
      }
    },
    // eslint-disable-next-line
    []
  );
  return { request };
};
export default useFetch;
