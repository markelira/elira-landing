'use client';

import { db } from './firebase';
import { collection, addDoc, updateDoc, doc, increment } from 'firebase/firestore';

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  occupation?: string;
  education?: string;
  selectedMagnets: string[];
}

export async function submitFormDirectly(data: FormData) {
  try {
    // Add subscriber to Firestore
    const subscriberData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      occupation: data.occupation || '',
      education: data.education || '',
      selectedMagnets: data.selectedMagnets,
      subscribedAt: new Date().toISOString(),
      source: 'website',
      status: 'active'
    };

    await addDoc(collection(db, 'subscribers'), subscriberData);

    // Update stats
    const statsRef = doc(db, 'stats', 'downloads');
    await updateDoc(statsRef, {
      totalDownloads: increment(1),
      lastUpdated: new Date().toISOString()
    });

    // Send email via SendGrid API directly from client
    // Note: This requires CORS to be enabled on SendGrid or using a proxy
    const emailData = {
      to: data.email,
      from: 'info@elira.hu',
      subject: 'Letöltési linkek - Elira Education',
      html: `
        <h2>Köszönjük a feliratkozást!</h2>
        <p>Kedves ${data.firstName}!</p>
        <p>Az alábbi linkeken töltheted le a kiválasztott anyagokat:</p>
        <ul>
          ${data.selectedMagnets.map(magnet => `<li>${magnet}</li>`).join('')}
        </ul>
        <p>Üdvözlettel,<br>Elira Education csapata</p>
      `
    };

    // For now, we'll skip the email sending since it requires backend
    // The form submission to Firestore will work

    return { success: true, message: 'Sikeres feliratkozás!' };
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
}