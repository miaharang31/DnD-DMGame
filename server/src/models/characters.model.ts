import { RowDataPacket } from "mysql2";

export default interface Characters extends RowDataPacket {
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
    // abilityScores?: JSON;
    languages?: JSON;
    expertise?: JSON;
    featuresTraits?: JSON;

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
}