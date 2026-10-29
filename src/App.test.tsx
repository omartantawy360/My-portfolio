import { profile, projects, skills, certificates } from './data/portfolioData';

describe('Portfolio Core Data Integrity', () => {
  test('profile has genuine required metadata', () => {
    expect(profile.name).toBe('Omar Tantawy');
    expect(profile.role).toBe('Frontend Developer');
    expect(profile.email).toBe('omartantawy360@gmail.com');
  });

  test('contains all verified projects', () => {
    expect(projects.length).toBe(9);
    projects.forEach((proj) => {
      expect(proj.title).toBeTruthy();
      expect(proj.link).toBeTruthy();
      expect(proj.tags.length).toBeGreaterThan(0);
    });
  });

  test('contains all verified skills', () => {
    expect(skills.length).toBe(12);
  });

  test('contains verified certificates', () => {
    expect(certificates.length).toBe(6);
  });
});
