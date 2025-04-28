import axios from "axios";
import { STORY_ENDPOINTS } from "../config/apiEndpoints";




function useStories() {



    const newStory = async (description: string): Promise<any> => {
        console.log('new story...', STORY_ENDPOINTS.POST_STORY)

        try {
            const response = await axios.post(`${STORY_ENDPOINTS.POST_STORY}`,
                {
                    description,
                },
                {
                    // headers: {
                    //     Authorization: `${authToken}`,
                    // },
                });
            console.log('response', response.data)
            return response.data;
        } catch (error: any) {
            // Check if the error has a response and a data property
            if (error.response && error.response.data && error.response.data.error) {
                throw new Error(error.response.data.error); // Access the error message
            } else {
                throw new Error('An unexpected error occurred');
            }
        }
    }


    return {
        newStory,
    };
}
export default useStories;