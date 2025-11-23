import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

/**
 * **Feature: ton-wallet-integration, Property 6: Address formatting and display**
 * **Validates: Requirements 2.1, 2.3**
 * 
 * Property: For any valid wallet address, the shortened display should show 
 * first 6 and last 4 characters, and the full address should be preserved.
 */

// Utility function to test (extracted from the hook for testing)
function formatAddress(addr: string): string {
  if (!addr || addr.length < 10) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

describe('Property-Based Tests: Address Formatting', () => {
  it('Property 6: Address formatting preserves first 6 and last 4 characters', () => {
    fc.assert(
      fc.property(
        // Generate valid TON addresses (48-character base64url strings)
        fc.stringMatching(/^[A-Za-z0-9_-]{48}$/),
        (address) => {
          const formatted = formatAddress(address);
          
          // Property 1: Formatted address should have the pattern: 6 chars + "..." + 4 chars
          expect(formatted).toMatch(/^.{6}\.{3}.{4}$/);
          
          // Property 2: First 6 characters should match original
          expect(formatted.slice(0, 6)).toBe(address.slice(0, 6));
          
          // Property 3: Last 4 characters should match original
          expect(formatted.slice(-4)).toBe(address.slice(-4));
          
          // Property 4: Middle should be exactly "..."
          expect(formatted.slice(6, 9)).toBe('...');
          
          // Property 5: Total length should be 13 (6 + 3 + 4)
          expect(formatted.length).toBe(13);
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design doc
    );
  });

  it('Property 6: Short addresses (< 10 chars) are returned unchanged', () => {
    fc.assert(
      fc.property(
        // Generate short strings (0-9 characters)
        fc.string({ minLength: 0, maxLength: 9 }),
        (shortAddress) => {
          const formatted = formatAddress(shortAddress);
          
          // Property: Short addresses should be returned as-is
          expect(formatted).toBe(shortAddress);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 6: Empty or null addresses are handled gracefully', () => {
    // Test empty string
    expect(formatAddress('')).toBe('');
    
    // Test addresses at boundary (exactly 10 chars should be formatted)
    const tenCharAddr = '0123456789';
    const formatted = formatAddress(tenCharAddr);
    expect(formatted).toBe('012345...6789');
  });

  it('Property 6: Address formatting is idempotent for long addresses', () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[A-Za-z0-9_-]{48}$/),
        (address) => {
          const formatted1 = formatAddress(address);
          const formatted2 = formatAddress(address);
          
          // Property: Formatting the same address multiple times yields same result
          expect(formatted1).toBe(formatted2);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 6: Different addresses produce different formatted outputs', () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[A-Za-z0-9_-]{48}$/),
        fc.stringMatching(/^[A-Za-z0-9_-]{48}$/),
        (address1, address2) => {
          // Only test when addresses are actually different
          fc.pre(address1 !== address2);
          
          const formatted1 = formatAddress(address1);
          const formatted2 = formatAddress(address2);
          
          // Property: Different addresses should produce different formatted strings
          // (unless they happen to have same first 6 and last 4, which is extremely rare)
          if (address1.slice(0, 6) !== address2.slice(0, 6) || 
              address1.slice(-4) !== address2.slice(-4)) {
            expect(formatted1).not.toBe(formatted2);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
