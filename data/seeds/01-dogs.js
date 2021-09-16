
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('dogs').del()
    .then(function () {
      // Inserts seed entries
      return knex('dogs').insert([
        {dog_id: 1, dog_name: 'fido', dog_age: 3},
        {dog_id: 2, dog_name: 'spike', dog_age: 2},
        {dog_id: 3, dog_name: 'sawyer', dog_age: 1},
        {dog_id: 4, dog_name: 'bentley', dog_age: 6},
        {dog_id: 5, dog_name: 'ruby', dog_age: 4},
        {dog_id: 6, dog_name: 'gizmo', dog_age: 5},
      ]);
    });
};
