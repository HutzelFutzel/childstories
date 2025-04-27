import { EAgeRange } from "./enums";

const generatePrompt = (
    description: string,
    ageRange: string,
    rules: string[],
    language: string
) => {
    return `
    The following paragraph is a description of a situation, happening, day that has happened. 
    Use that to write a little story to remember this happening. The aim of this story is to
    remember things that happend in the day like in a diary. Make some story out of it. 

    The target group is children in the age ${ageRange}. To write this story, follow these rules:
    ${rules.join('\n')}
    The language of the story should be ${language}.

    provide the same text in different formats: html and markdown

    Here is the description of the situation, use all the details provided in the description:
    ${description}
    `;
};

export default generatePrompt;