import { int, mysqlTable, varchar, date, timestamp, mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const usersTable = mysqlTable('Users', {
  Id: int().primaryKey().autoincrement().notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  googleId: varchar({ length: 255 }),
  googleProfilePic: varchar({ length: 255 }),
  userType: mysqlEnum('userRole', ['ADMIN', 'RESTAURANT']).default('RESTAURANT').notNull(),
});

// ambot unsaon ni
export const contactTable = mysqlTable('Contact', {
  contactId: int().primaryKey().autoincrement().notNull(),
  firstname: varchar({ length: 255 }).notNull(),
  lastname: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  message: varchar({ length: 255 }).notNull(),
});

// Change restaurant account details vvvv
export const restaurantTable = mysqlTable('Restaurant', {
  restaurantId: int().primaryKey().autoincrement().notNull(),
  userId: int()
    .references(() => usersTable.Id)
    .notNull(),
  restaurantName: varchar({ length: 255 }).notNull(),
  streetAddress: varchar({ length: 255 }).notNull(),
  barangay: varchar({ length: 255 }).notNull(),
  city: varchar({ length: 255 }).notNull(),
  province: varchar({ length: 255 }).notNull(),
  contactNumber: varchar({ length: 255 }).notNull(),
});

// export const adminTable = mysqlTable('Admin', {
//   adminId: int().primaryKey().autoincrement().notNull(),
//   userId: int()
//     .references(() => usersTable.Id)
//     .notNull(),
//   restaurantId: int()
//     .references(() => restaurantTable.restaurantId)
//     .notNull(),
// });

// ang admin mo gamit ani pang add sa charity niya ang restaurant kay makita ang details sa charity og pag pili sa charity ganahan i donate
export const charityTable = mysqlTable('Charity', {
  charityId: int().primaryKey().autoincrement().notNull(),
  userId: int()
    .references(() => usersTable.Id)
    .notNull(),
  charityName: varchar({ length: 255 }).notNull(),
  streetAddress: varchar({ length: 255 }).notNull(),
  barangay: varchar({ length: 255 }).notNull(),
  city: varchar({ length: 255 }).notNull(),
  province: varchar({ length: 255 }).notNull(),
  contactNumber: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
});

// export const pickupLocationTable = mysqlTable('PickupLocation', {
//   locationId: int().primaryKey().autoincrement().notNull(),
//   streetAddress: varchar({ length: 255 }).notNull(),
//   barangay: varchar({ length: 255 }).notNull(),
//   city: varchar({ length: 255 }).notNull(),
//   province: varchar({ length: 255 }).notNull(),
// });

// Sa restaurant side ni pag add og view sa donation niya sa admin side kay ma view nila details sa donation
export const foodDonationTable = mysqlTable('FoodDonation', {
  donationId: int().primaryKey().autoincrement().notNull(),
  userId: int()
    .references(() => usersTable.Id)
    .notNull(),
  //   restaurantId: int()
  //     .references(() => restaurantTable.restaurantId)
  //     .notNull(),
  charityId: int()
    .references(() => charityTable.charityId)
    .notNull(),
  restaurantName: varchar({ length: 255 }).notNull(),
  foodItemName: varchar({ length: 255 }).notNull(),
  quantity: int().notNull(),
  category: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  streetAddress: varchar({ length: 255 }).notNull(),
  barangay: varchar({ length: 255 }).notNull(),
  city: varchar({ length: 255 }).notNull(),
  province: varchar({ length: 255 }).notNull(),
  pickupDate: date().notNull(),
  specialInstructions: varchar({ length: 255 }).notNull(),
  contactName: varchar({ length: 255 }).notNull(),
  contactNumber: varchar({ length: 255 }).notNull(),
  allergens: varchar({ length: 255 }).notNull(),
  storageRequirements: varchar({ length: 255 }).notNull(),
  photoUrl: varchar({ length: 255 }).notNull(),
  status: mysqlEnum('donationStatus', ['PENDING', 'ACCEPTED', 'REJECTED'])
    .default('PENDING')
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

// Sa restaurant side og admin side mo gamit  ani
// export const pickupScheduleTable = mysqlTable('PickupSchedule', {
//   scheduleId: int().primaryKey().autoincrement().notNull(),
//   donationId: int()
//     .references(() => foodDonationTable.donationId)
//     .notNull(),
//   charityId: int()
//     .references(() => charityTable.charityId)
//     .notNull(),
//   status: varchar({ length: 255 }).notNull(),
// });

// Sa restaurant side ni
// export const donationHistoryTable = mysqlTable('DonationHistory', {
//   historyId: int().primaryKey().autoincrement().notNull(),
//   scheduleId: int()
//     .references(() => pickupScheduleTable.scheduleId)
//     .notNull(),
//   completionDate: date().notNull(),
//   completionTime: timestamp().notNull(),
// });

// RELATIONS
export const usersRelations = relations(usersTable, ({ many }) => ({
  restaurants: many(restaurantTable),
  charities: many(charityTable),
  foodDonations: many(foodDonationTable),
}));

export const restaurantRelations = relations(restaurantTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [restaurantTable.userId],
    references: [usersTable.Id],
  }),
}));

export const charityRelations = relations(charityTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [charityTable.userId],
    references: [usersTable.Id],
  }),
}));

export const foodDonationRelations = relations(foodDonationTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [foodDonationTable.userId],
    references: [usersTable.Id],
  }),
  charity: one(charityTable, {
    fields: [foodDonationTable.charityId],
    references: [charityTable.charityId],
  }),
}));
