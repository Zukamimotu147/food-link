import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { db } from '../drizzle/database/connection';
import { usersTable } from '../drizzle/tableSchema';
import { eq } from 'drizzle-orm';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, profile.emails![0].value));
        if (user.length > 0) {
          return done(null, user[0]);
        } else {
          const newUser = await db.insert(usersTable).values({
            name: profile.displayName,
            email: profile.emails![0].value,
            password: '',
            userType: 'RESTAURANT',
          });
          return done(null, newUser);
        }
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser(async (id: any, done) => {
  const user = await db
    .select({ id: usersTable.Id })
    .from(usersTable)
    .where(eq(usersTable.Id, id))
    .limit(1);
  done(null, user);
});
