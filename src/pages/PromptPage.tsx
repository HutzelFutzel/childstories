import React, { useEffect, useState } from 'react'
import TextInputArea from '../component/TextInputArea';
import generatePrompt from '../utils/prompt';
import { GoogleGenAI, Schema } from '@google/genai';
import { storiesResponseSchema } from '../utils/responseSchemas';
import { EAgeRange, ELanguage } from '../utils/enums';

// 1. Panda
// 2. Bunny
// 3. Kitten
// 4. Puppy
// 5. Duckling
// 6. Fawn
// 7. Chick
// 8. Turtle
// 9. Koala
// 10. Hedgehog
// 11. Otter
// 12. Elephant Calf
// 13. Seal Pup
// 14. Ladybug
// 15. Squirrel
// 16. Penguin Chick
// 17. Giraffe Calf
// 18. Fox Cub
// 19. Lamb
// 20. Goldfish

const PromptPage = () => {

    const apiKey = 'AIzaSyAT_QR_Qu9tdFatQa3aZCOyA8QpEwKD46w';

    const [input, setInput] = useState('');
    const [ageRange, setAgeRange] = useState<EAgeRange>(EAgeRange.ZERO_TO_TWO);
    const [language, setLanguage] = useState<ELanguage>(ELanguage.ENGLISH_US);
    const [rules, setRules] = useState<string[]>([]);

    const [output, setOutput] = useState<string>('');
    const [outputHtml, setOutputHtml] = useState<string>('');
    const [outputMarkdown, setOutputMarkdown] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        switch (ageRange) {
            case EAgeRange.ZERO_TO_TWO:
                setRules(rules0to2);
                break;
            case EAgeRange.THREE_TO_FOUR:
                setRules(rules3to4);
                break;
            case EAgeRange.FIVE_TO_SIX:
                setRules(rules5to6);
                break;
            case EAgeRange.SEVEN_TO_EIGHT:
                setRules(rules7to8);
                break;
        }
    }, [ageRange]);
    
    const animals = [
        'Elephant',
        'Penguin',
        'Giraffe',
        'Fox',
        'Lamb',
        'Goldfish',
        'Koala',
        'Turtle',
        'Hedgehog',
        'Otter',
        'Seal Pup',
        'Squirrel',
        'Bear',
        'Giraffe',
        'Fox',
        'Sheep',
        'Goldfish',
        'Koala',
        'Cat'
    ]
   
    const rules0to2 = [
        'Use simple and familiar words',
        'Keep sentences very short',
        'Include rhyming patterns but do not overdo it',
        `Each person is one of the following animals: ${animals.join(', ')}`,
        'if known, add the role of the person in front of the animal like "Mama Elephant" or "Papa Penguin"',
        'members of the same family should have the same animal',
        'friends should have different animals',
        'the main character is a baby in the age range of 0 to 2 years',
        'story length should be 100 words or less',
        
    ]

    const rules3to4 = [
        'Simple sentences with basic conjunctions',
        'Introduce compound sentences but not too many',
        'Use repetitive phrases',
        'Include rhyming elements when possible',
        'Simple narratives with clear sequences',
        'Make each person a cute animal',
        'make it an animal story',
        'story the main plot should be about friendship and family',
        'story length should be 200 words or less'
    ]

    const rules5to6 = [
        'Mix of simple and compound sentences',
        'Introduce basic complex sentences but not too many',
        'More varied vocabulary',
        'Add some character development',
        'make it adventurous',
        'story length should be 300 words or less',
        'Use dialogue to advance the plot'
    ]

    const rules7to8 = [
        'add some complexity to the sentence structures, so that the story is more intersting for children in age 7 to 8',
        'use some figurative language',
        'use varied vocabulary with some challenging words',
        'use dialogues and descriptions to advance the plot',
        'make it a bit adventurous and mysterious',
        'story length should be 400 words or less'
    ]

    const onSubmit = async () => {
        setIsLoading(true);
        const prompt = generatePrompt(input, ageRange, rules, language);
        console.log('prompt', prompt);
        const ai = new GoogleGenAI({ apiKey: apiKey });
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: storiesResponseSchema as Schema
            }
        });
        console.log(response.text);
        const responseJson = JSON.parse(response.text || '{}');
        setOutput(response.text || 'ERROR');
        setOutputHtml(responseJson.html || 'ERROR');
        setOutputMarkdown(responseJson.markdown || 'ERROR');
        setIsLoading(false);
    }
    
    return (
        <div>
            <h1>Prompt Page</h1>
            <p>This is the prompt page</p>

            <select 
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value as EAgeRange)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
            >
                {Object.values(EAgeRange).map((age) => (
                    <option key={age} value={age}>{age}</option>
                ))}
            </select>
            
            <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as ELanguage)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
            >
                {Object.values(ELanguage).map((lang) => (   
                    <option key={lang} value={lang}>{lang}</option>
                ))}
            </select>
            
            <TextInputArea
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={onSubmit} disabled={isLoading}>{isLoading ? 'Generating...' : 'Submit'}</button>

            {isLoading && <div>Loading...</div>}
            {output && <div>
                <h2>Output</h2>
                <div dangerouslySetInnerHTML={{ __html: outputHtml }} />
            </div>}
            {outputMarkdown && <div>
                <h2>Output Markdown</h2>
                <div>{outputMarkdown}</div>
            </div>}
        </div>
    )
}

export default PromptPage