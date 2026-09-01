'use client';

import Link from "next/link";
import { useState } from "react";
import { getUser } from "@/lib/api";


export default function Home() {
  const [user] = useState(() => getUser());

  return (
    <>
      <section className="hero">
        <div className="heroContent">
          <p className="eyebrow">YOUR K-POP UNIVERSE</p>
          <h1>
            {user ? (
              <>
                Welcome Back, {user.username}. <br /> Your Biases Are Waiting!
              </>
            ): (
              <>
                Find your Bias. <br/> Build your Lineup.
              </>
            )}
          </h1>
          <p>
            {user 
            ? 'Jump back into your K-pop collection, discover new idols, and keep your ultimate bias lineup updated.'
            : 'Discover idols from your favorite groups, create your personal bias list, rank your favorites, and keep track of who owns your heart this comeback.'}
          </p>
          <div className="heroButton">
            <Link href='/idols' className="button">
              Explore Idols
            </Link>
            {!user && (
              <Link href='/register' className="button secondary">
                Create Account
              </Link>
            )}
            {user && (
              <Link href='/dashboard' className="button secondary">
                My Biases
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link href='/admin' className="button secondary">
                Admin Dashboard
              </Link>
            )}
            
          </div>
        </div>
      </section>
      <section className="section">
        <p className="eyebrow">
          {user ? 'YOUR BIASBOARD' : 'HOW IT WORKS'}
        </p>
        <h2>
          {user ? 'Keep Building Your Ultimate Lineup.' : 'Build Your Ultimate Bias List.'}
        </h2>
        <div className="featureGrid">
          <div className="featureCard">
            <span>01</span>
            <h3>Discover</h3>
            <p>
              Browse K-pop idols and groups without needing an account.
            </p>
          </div>
          <div className="featureCard">
            <span>02</span>
            <h3>{user ? 'Manage' : 'Save'}</h3>
            <p>
              {user ? 'Add and remove idols from your personal collection whenever your bias list changes.' : 'Sign in and add idols to your personal collection.'}
            </p>
          </div>
          <div className="featureCard">
            <span>03</span>
            <h3>Rank</h3>
            <p>
              Give each bias a ranking and write your own personal notes.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
