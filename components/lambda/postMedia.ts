import { RenderMediaOnLambdaOutput } from "@remotion/lambda";
import axios from "axios";

export const postMedia = async (id: string, inputProps: any): Promise<RenderMediaOnLambdaOutput | null> => {
  try {
    console.log("props", inputProps)
    const result = await axios.post(`/api/lambda/media`, { id: id, inputProps: inputProps });
    return result.data;
  }
  catch {
    return null
  }
}