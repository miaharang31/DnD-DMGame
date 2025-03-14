import { RowDataPacket } from "mysql2";

export default interface Character extends RowDataPacket {
    id?: number;
    userid?: number; //linked to the owner of the character
    name?: string;
    
    level?: number;

    // References API
    race?: string;
    class?: string;
    background?: string;
    alignment?: string; 
    feats?: JSON;
    traits?: JSON;
    savingThrows?: JSON; // holding all the proficiencies
    skills?: JSON; // holding all the proficiencies
    languages?: JSON;
    expertise?: JSON;
    featuresTraits?: JSON;
    equipment?: JSON;

    attacks?: JSON;

    // Derived Stats
    hp?: number;
    temphp?: number;
    maxhp?: number;
    ac?: number;
    speed?: number;
    initiative?: number;

    // Personality Notes
    personalityTraits?: string;
    ideals?: string;
    bonds?: string;
    flaws?: string;

    // Visuals
    age?: number;
    height?: string;
    weight?: number;
    eyes?: string;
    skin?: string;
    hair?: string;

    // Bag and Allies
    allies?: string;
    treasure?: string;
    backstory?: string;
}