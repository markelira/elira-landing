'use client';

import Image from 'next/image';
import { authorBioStyles } from '@/lib/blog-design-tokens';

export interface Author {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  linkedin?: string;
  twitter?: string;
}

interface AuthorBioProps {
  author: Author;
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className={authorBioStyles.container}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            width={80}
            height={80}
            className={`${authorBioStyles.avatar} object-cover`}
          />
        ) : (
          <div className={`${authorBioStyles.avatar} bg-gray-200 flex items-center justify-center`}>
            <span className="text-gray-600 font-bold text-2xl">
              {author.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className={authorBioStyles.name}>{author.name}</h3>
        <p className={authorBioStyles.title}>{author.title}</p>
        <p className={authorBioStyles.bio}>{author.bio}</p>

        {/* Social Links */}
        {(author.linkedin || author.twitter) && (
          <div className="flex gap-4 mt-4">
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            )}
            {author.twitter && (
              <a
                href={author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
