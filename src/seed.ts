import { doc, setDoc } from 'firebase/firestore'
import {v4 as uuidv4} from 'uuid'

import { firebaseDb } from './lib/firebase'

export interface User {
  userId: string
  username: string
  fullName: string
  emailAddress: string
  following: string[]
  followers: string[]
  dateCreated: number
}

export interface Comment {
  comment: string
  displayName: string
}

export interface Photo {
  caption: string
  comments: Comment[]
  dateCreated: number
  imageSrc: string
  likes: string[]
  photoId: number
  userId: string
  userLatitude: string
  userLongitude: string
}

export async function seedDatabase() {
  const users: User[] = [
    {
      userId: 'BXWyxneNY6XniqIIKn0HhQMzwCE2',
      username: 'karl',
      fullName: 'Karl Hadwen',
      emailAddress: 'karlhadwen@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now()
    },
    {
      userId: '2',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['BXWyxneNY6XniqIIKn0HhQMzwCE2'],
      dateCreated: Date.now()
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['BXWyxneNY6XniqIIKn0HhQMzwCE2'],
      dateCreated: Date.now()
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['BXWyxneNY6XniqIIKn0HhQMzwCE2'],
      dateCreated: Date.now()
    }
  ]

  for (let i = 0; i < users.length; i++) {
    const user = users[i]
    await setDoc(doc(firebaseDb, 'users', uuidv4()), user)
  }

  for (let i = 1; i <= 5; i++) {
    await setDoc(doc(firebaseDb, 'photos', uuidv4()), {
      photoId: i,
      userId: '2',
      imageSrc: `/images/users/raphael/${i}.jpg`,
      caption: 'Saint George and the Dragon',
      likes: [],
      comments: [
        {
          displayName: 'dali',
          comment: 'Love this place, looks like my animal farm!'
        },
        {
          displayName: 'orwell',
          comment: 'Would you mind if I used this picture?'
        }
      ],
      userLatitude: '40.7128°',
      userLongitude: '74.0060°',
      dateCreated: Date.now()
    })
  }
}
