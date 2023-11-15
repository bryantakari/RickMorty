import React from 'react'
interface CharProps{
    id: number;
    name: string;
    age: number;

}
export class Character extends React.Component {
    
    constructor(props: CharProps) {
        super(props);
    }
  }
export default Character