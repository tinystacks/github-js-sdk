import Organizations from "clients/organizations";

let organizations: Organizations;

beforeEach(() => {
  organizations = new Organizations({
    
  });
});

const initAuthenticatedClient = () => {
  organizations = new Organizations({
    auth: process.env.PERSONAL_ACCESS_TOKEN,
  })
}

test('list unauthenticated', async() => {
  const list = await organizations.ListOrganizations({});
  expect(list.length).toBeGreaterThan(1);  
});

test('list user public', async() => {
  const list = await organizations.ListOrganizations({ username: "safeer" });
  expect(list.length).toBeGreaterThan(1);  
});

test('list authenticated user unauthenticated fails', async() => {
  try {
    await organizations.ListOrganizationsForAuthenticatedUser({});
  } catch(e) {
    expect(e.message).toEqual("Requires authentication");
  }
});

test('list authenticated user', async() => {
  initAuthenticatedClient();
  const list = await organizations.ListOrganizationsForAuthenticatedUser({});
  expect(list.length).toBeGreaterThan(1);
});
