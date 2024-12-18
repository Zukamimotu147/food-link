import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { db } from '../drizzle/database/connection.js';
import { usersTable } from '../drizzle/tableSchema.js';
import { eq, and } from 'drizzle-orm';
// import { generateToken } from '../services/generateToken';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://food-link.onrender.com/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.emails || profile.emails.length === 0) {
          return done(new Error('No email found in Google profile'));
        }

        const email = profile.emails[0].value;

        const existingUser = await db
          .select()
          .from(usersTable)
          .where(and(eq(usersTable.email, email), eq(usersTable.userType, 'RESTAURANT')));

        if (existingUser.length > 0) {
          await db
            .update(usersTable)
            .set({ googleProfilePic: profile.photos?.[0]?.value })
            .where(eq(usersTable.googleId, profile.id));
          return done(null, existingUser[0]);
        }

        const user = await db.select().from(usersTable).where(eq(usersTable.email, email));
        if (user.length > 0) {
          return done(null, user[0]);
        } else {
          const newUser = await db.insert(usersTable).values({
            name: profile.displayName,
            googleId: profile.id,
            googleProfilePic: profile.photos?.[0]?.value,
            email: email,
            password: '',
            userType: 'RESTAURANT',
          });
          const createdUser = await db.select().from(usersTable).where(eq(usersTable.email, email));

          return done(null, createdUser[0]);
        }
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user);
  if (!user || !user.Id) {
    return done(new Error('User  ID is missing'));
  }

  done(null, user.Id);
});

passport.deserializeUser(async (id, done) => {
  console.log('Deserializing user:', id);
  try {
    const user = await db.select().from(usersTable).where(eq(usersTable.Id, id));
    console.log('Deserialized user:', user);

    if (!user || user.length === 0) {
      return done(new Error('User  not found'));
    }

    done(null, user[0]);
  } catch (error) {
    console.error('Error during deserialization:', error);
    done(error);
  }
});
