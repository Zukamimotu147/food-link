import { int, mysqlTable, varchar, date, timestamp, mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const usersTable = mysqlTable('Users', {
  Id: int().primaryKey().autoincrement().notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  userType: mysqlEnum('userRole', ['ADMIN', 'RESTAURANT']).default('RESTAURANT').notNull(),
});

export const contactTable = mysqlTable('Contact', {
  contactId: int().primaryKey().autoincrement().notNull(),
  firstname: varchar({ length: 255 }).notNull(),
  lastname: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  message: varchar({ length: 255 }).notNull(),
});

export const restaurantTable = mysqlTable('Restaurant', {
  restaurantId: int().primaryKey().autoincrement().notNull(),
  userId: int()
    .references(() => usersTable.Id)
    .notNull(),
  name: varchar({ length: 255 }).notNull(),
  streetAddress: varchar({ length: 255 }).notNull(),
  barangay: varchar({ length: 255 }).notNull(),
  city: varchar({ length: 255 }).notNull(),
  province: varchar({ length: 255 }).notNull(),
  contactNumber: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
});

export const charityTable = mysqlTable('Charity', {
  charityId: int().primaryKey().autoincrement().notNull(),
  userId: int()
    .references(() => usersTable.Id)
    .notNull(),
  name: varchar({ length: 255 }).notNull(),
  streetAddress: varchar({ length: 255 }).notNull(),
  barangay: varchar({ length: 255 }).notNull(),
  city: varchar({ length: 255 }).notNull(),
  province: varchar({ length: 255 }).notNull(),
  contactNumber: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
});

export const pickupLocationTable = mysqlTable('PickupLocation', {
  locationId: int().primaryKey().autoincrement().notNull(),
  streetAddress: varchar({ length: 255 }).notNull(),
  barangay: varchar({ length: 255 }).notNull(),
  city: varchar({ length: 255 }).notNull(),
  province: varchar({ length: 255 }).notNull(),
});

export const foodDonationTable = mysqlTable('FoodDonation', {
  donationId: int().primaryKey().autoincrement().notNull(),
  restaurantId: int()
    .references(() => restaurantTable.restaurantId)
    .notNull(),
  itemName: varchar({ length: 255 }).notNull(),
  quantity: int().notNull(),
  pickupTime: timestamp().defaultNow().notNull(),
  description: varchar({ length: 255 }).notNull(),
  pickupLocationId: int()
    .references(() => pickupLocationTable.locationId)
    .notNull(),
  pickupDate: date().notNull(),
  specialInstructions: varchar({ length: 255 }).notNull(),
  allergens: varchar({ length: 255 }).notNull(),
  restaurantContactId: int()
    .references(() => contactTable.contactId)
    .notNull(),
  status: mysqlEnum('donationStatus', ['PENDING', 'ACCEPTED', 'REJECTED'])
    .default('PENDING')
    .notNull(),
});

export const pickupScheduleTable = mysqlTable('PickupSchedule', {
  scheduleId: int().primaryKey().autoincrement().notNull(),
  donationId: int()
    .references(() => foodDonationTable.donationId)
    .notNull(),
  charityId: int()
    .references(() => charityTable.charityId)
    .notNull(),
  charityContactId: int()
    .references(() => contactTable.contactId)
    .notNull(),
  status: varchar({ length: 255 }).notNull(),
});

export const donationHistoryTable = mysqlTable('DonationHistory', {
  historyId: int().primaryKey().autoincrement().notNull(),
  scheduleId: int()
    .references(() => pickupScheduleTable.scheduleId)
    .notNull(),
  completionDate: date().notNull(),
  completionTime: timestamp().notNull(),
});

////////////////////

// Contact relations
export const contactRelations = relations(contactTable, ({ many }) => ({
  foodDonations: many(foodDonationTable),
  pickupSchedules: many(pickupScheduleTable),
}));

// Users relations
export const usersRelations = relations(usersTable, ({ many }) => ({
  restaurants: many(restaurantTable),
  charities: many(charityTable),
}));

// Restaurant relations
export const restaurantRelations = relations(restaurantTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [restaurantTable.userId],
    references: [usersTable.Id],
  }),
  foodDonations: many(foodDonationTable),
}));

// PickupLocation relations
export const pickupLocationRelations = relations(pickupLocationTable, ({ many }) => ({
  foodDonations: many(foodDonationTable),
}));

// FoodDonation relations
export const foodDonationRelations = relations(foodDonationTable, ({ one, many }) => ({
  restaurant: one(restaurantTable, {
    fields: [foodDonationTable.restaurantId],
    references: [restaurantTable.restaurantId],
  }),
  pickupLocation: one(pickupLocationTable, {
    fields: [foodDonationTable.pickupLocationId],
    references: [pickupLocationTable.locationId],
  }),
  restaurantContact: one(contactTable, {
    fields: [foodDonationTable.restaurantContactId],
    references: [contactTable.contactId],
  }),
  pickupSchedules: many(pickupScheduleTable),
}));

// Charity relations
export const charityRelations = relations(charityTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [charityTable.userId],
    references: [usersTable.Id],
  }),
  pickupSchedules: many(pickupScheduleTable),
}));

// PickupSchedule relations
export const pickupScheduleRelations = relations(pickupScheduleTable, ({ one, many }) => ({
  foodDonation: one(foodDonationTable, {
    fields: [pickupScheduleTable.donationId],
    references: [foodDonationTable.donationId],
  }),
  charity: one(charityTable, {
    fields: [pickupScheduleTable.charityId],
    references: [charityTable.charityId],
  }),
  charityContact: one(contactTable, {
    fields: [pickupScheduleTable.charityContactId],
    references: [contactTable.contactId],
  }),
  donationHistories: many(donationHistoryTable),
}));

// DonationHistory relations
export const donationHistoryRelations = relations(donationHistoryTable, ({ one }) => ({
  pickupSchedule: one(pickupScheduleTable, {
    fields: [donationHistoryTable.scheduleId],
    references: [pickupScheduleTable.scheduleId],
  }),
}));
