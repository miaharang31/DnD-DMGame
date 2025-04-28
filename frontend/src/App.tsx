import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

interface ICharacterSheet {
  name: string;
  class: string;
  race: string;
  background: string;
  alignment: string;
  level: number;
  experience: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  hitPoints: number;
  armorClass: number;
  initiative: number;
  speed: number;
  savingThrows: { [key: string]: boolean };
  proficiencies: string[];
  spells: string[];
  equipment: string[];
}

const CharacterSheet: React.FC = () => {
  const { control, handleSubmit, setValue, register } = useForm<ICharacterSheet>();
  const [races, setRaces] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [backgrounds, setBackgrounds] = useState<string[]>([]);
  const [alignments, setAlignments] = useState<string[]>(['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil']);
  const [proficiencies, setProficiencies] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [raceData, classData, backgroundData] = await Promise.all([
          axios.get('https://www.dnd5eapi.co/api/races'),
          axios.get('https://www.dnd5eapi.co/api/classes'),
          axios.get('https://www.dnd5eapi.co/api/backgrounds')
        ]);

        setRaces(raceData.data.results.map((r: { name: string }) => r.name));
        setClasses(classData.data.results.map((c: { name: string }) => c.name));
        setBackgrounds(backgroundData.data.results.map((b: { name: string }) => b.name));
      } catch (error) {
        console.error('Error fetching D&D data:', error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = (data: ICharacterSheet) => {
    // Call your local API to store the data
    axios.post('http://localhost:5000/api/characters', data)
      .then(response => {
        console.log('Character saved successfully:', response);
      })
      .catch(error => {
        console.error('Error saving character:', error);
      });
  };

  return (
    <div>
      <h1>Create Your Character</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input {...register('name')} />
        </div>
        <div>
          <label>Class:</label>
          <select {...register('class')}>
            {classes.map((className, index) => (
              <option key={index} value={className}>{className}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Race:</label>
          <select {...register('race')}>
            {races.map((raceName, index) => (
              <option key={index} value={raceName}>{raceName}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Background:</label>
          <select {...register('background')}>
            {backgrounds.map((backgroundName, index) => (
              <option key={index} value={backgroundName}>{backgroundName}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Alignment:</label>
          <select {...register('alignment')}>
            {alignments.map((alignmentName, index) => (
              <option key={index} value={alignmentName}>{alignmentName}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Level:</label>
          <input type="number" {...register('level')} />
        </div>
        <div>
          <label>Experience:</label>
          <input type="number" {...register('experience')} />
        </div>

        <div>
          <label>Strength:</label>
          <input type="number" {...register('strength')} />
        </div>
        <div>
          <label>Dexterity:</label>
          <input type="number" {...register('dexterity')} />
        </div>
        <div>
          <label>Constitution:</label>
          <input type="number" {...register('constitution')} />
        </div>
        <div>
          <label>Intelligence:</label>
          <input type="number" {...register('intelligence')} />
        </div>
        <div>
          <label>Wisdom:</label>
          <input type="number" {...register('wisdom')} />
        </div>
        <div>
          <label>Charisma:</label>
          <input type="number" {...register('charisma')} />
        </div>

        <div>
          <label>Hit Points:</label>
          <input type="number" {...register('hitPoints')} />
        </div>
        <div>
          <label>Armor Class:</label>
          <input type="number" {...register('armorClass')} />
        </div>
        <div>
          <label>Initiative:</label>
          <input type="number" {...register('initiative')} />
        </div>
        <div>
          <label>Speed:</label>
          <input type="number" {...register('speed')} />
        </div>

        <div>
          <label>Saving Throws:</label>
          <div>
            {['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'].map((stat) => (
              <div key={stat}>
                <input type="checkbox" {...register(`savingThrows.${stat}`)} />
                <label>{stat}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label>Proficiencies:</label>
          <input type="text" {...register('proficiencies')} />
        </div>

        <div>
          <label>Spells:</label>
          <input type="text" {...register('spells')} />
        </div>

        <div>
          <label>Equipment:</label>
          <input type="text" {...register('equipment')} />
        </div>

        <button type="submit">Save Character</button>
      </form>
    </div>
  );
};

export default CharacterSheet;
