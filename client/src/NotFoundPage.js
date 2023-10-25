import React from 'react';
import NotFoundImg from "./assets/photos/not-found.png"

export default function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for does not exist.</p>
      <img src={NotFoundImg} />
    </div>
  );
};
