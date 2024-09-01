import { getInitials } from './string';

describe('getInitials', () => {
	it('should return the initials for a full name', () => {
		expect(getInitials('Aqil Gifari')).toBe('AG');
	});

	it('should return the initial for a single word name', () => {
		expect(getInitials('Aqil')).toBe('A');
	});

	it('should handle names with multiple spaces correctly', () => {
		expect(getInitials('  Aqil   Gifari ')).toBe('AG');
	});

	it('should return an empty string for an empty name', () => {
		expect(getInitials('')).toBe('');
	});

	it('should return an empty string for undefined input', () => {
		expect(getInitials(undefined)).toBe('');
	});

	it('should handle names with hyphens or special characters correctly', () => {
		expect(getInitials('Aqil-Marie')).toBe('A');
		expect(getInitials('Aqil-Marie Gifari')).toBe('AG');
	});

	it('should handle names with apostrophes correctly', () => {
		// eslint-disable-next-line quotes
		expect(getInitials("D'Arcy Wretzky")).toBe('DW');
	});

	it('should handle names with non-letter characters correctly', () => {
		expect(getInitials('123 Aqil')).toBe('1A');
		expect(getInitials('Aqil 123 Gifari')).toBe('A1G');
	});
});
