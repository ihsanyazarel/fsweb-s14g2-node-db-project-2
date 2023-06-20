/**
 * @param {import("knex").Knex"} knex
 * @returns { Promise<void>}
 */

const initialData = [
    { vin: "test-1", make: "test-1", model: "test-1", mileage: 9999, title: "test-1", transmission: "test-1"},
    { vin: "test-2", make: "test-2", model: "test-2", mileage: 9999, title: "test-2", transmission: "test-2"},
    { vin: "test-3", make: "test-3", model: "test-3", mileage: 9999, title: "test-3", transmission: "test-3"},
    { vin: "test-4", make: "test-4", model: "test-4", mileage: 9999, title: "test-4", transmission: "test-4"},
    { vin: "test-5", make: "test-5", model: "test-5", mileage: 9999, title: "test-5", transmission: "test-5"}
];

exports.seed = async function (knex) {
    // Tüm dataları önce siler, sonra verilenleri ekler:
    // await knex("cars").del(), dersek id izleri kalır.
    // await knex("cars").truncate(), dersek id izleri kalmaz. Genellikle bu tercih edilir.

    await knex("cars").truncate()

    await knex("cars").insert(initialData);
}