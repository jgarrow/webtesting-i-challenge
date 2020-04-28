const enhancer = require('./enhancer.js');
// test away!

describe('enhancer', () => {
    describe('get item', () => {
        it('returns the item provided', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 0,
            };

            const actualOutcome = enhancer.get(item);

            expect(actualOutcome).toEqual(item);
        });
        it('throws an error if not given an item object with correct structure', () => {
            expect(() => {
                enhancer.get(5);
            }).toThrow();
            expect(() => {
                enhancer.get('knife');
            }).toThrow();
            expect(() => {
                enhancer.get([1, 5, 'sword']);
            }).toThrow();
            expect(() => {
                enhancer.get({ name: 'bow', durability: 45 });
            }).toThrow();
            expect(() => {
                enhancer.get({ enhancement: 8, durability: 52 });
            }).toThrow();
            expect(() => {
                enhancer.get({ enhancement: 8, durability: -1 });
            }).toThrow();
            expect(() => {
                enhancer.get({ enhancement: 8, durability: 101 });
            }).toThrow();
            expect(() => {
                enhancer.get({ enhancement: 16, name: 'spear' });
            }).toThrow();
            expect(() => {
                enhancer.get({ enhancement: -1, name: 'spear' });
            }).toThrow();
            expect(() => {
                enhancer.get({ enhancement: 21, name: 'spear' });
            }).toThrow();
        });

        it('name does not change if enhancement is 0', () => {
            const item = {
                name: 'hammer',
                durability: 72,
                enhancement: 0,
            };

            const actualOutcome = enhancer.get(item);

            expect(actualOutcome.name).toBe('hammer');
        });

        it('name updates to `[+NUM] NAME` if enhancement is greater than 0', () => {
            const item = {
                name: 'hammer',
                durability: 72,
                enhancement: 10,
            };

            const actualOutcome = enhancer.get(item);

            expect(actualOutcome.name).toBe('[+10] hammer');
        });
    });
    describe('repair', () => {
        it('restores item durability to 100', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 12,
            };

            const expectedOutcome = {
                name: 'hammer',
                durability: 100,
                enhancement: 12,
            };

            const actualOutcome = enhancer.repair(item);

            expect(actualOutcome.durability).toEqual(
                expectedOutcome.durability
            );
        });

        it('returns a new item object', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 12,
            };

            const expectedOutcome = {
                name: 'hammer',
                durability: 100,
                enhancement: 12,
            };

            const actualOutcome = enhancer.repair(item);

            expect(actualOutcome).toEqual(expectedOutcome);
        });

        it('throws an error if not given an item object with correct structure', () => {
            expect(() => {
                enhancer.fail(5);
            }).toThrow();
            expect(() => {
                enhancer.fail('knife');
            }).toThrow();
            expect(() => {
                enhancer.fail([1, 5, 'sword']);
            }).toThrow();
            expect(() => {
                enhancer.fail({ name: 'bow', durability: 45 });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: 8, durability: 52 });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: 8, durability: -1 });
            }).toThrow();
            expect(() => {
                enhancer.fail({
                    name: 'slingshot',
                    enhancement: 8,
                    durability: -1,
                });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: 8, durability: 101 });
            }).toThrow();
            expect(() => {
                enhancer.fail({
                    name: 'slingshot',
                    enhancement: 8,
                    durability: 101,
                });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: 16, name: 'spear' });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: -1, name: 'spear' });
            }).toThrow();
            expect(() => {
                enhancer.fail({
                    durability: 34,
                    enhancement: -1,
                    name: 'spear',
                });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: 21, name: 'spear' });
            }).toThrow();
        });

        it('item durability is a positive number', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 12,
            };

            const actualOutcome = enhancer.repair(item);

            expect(actualOutcome.durability).toBeGreaterThanOrEqual(0);
        });

        it('after repair, item durability is not greater than 100', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 12,
            };

            const actualOutcome = enhancer.repair(item);

            expect(actualOutcome.durability).toBeLessThanOrEqual(100);
        });

        it('item enhancement is not changed', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 12,
            };

            const expectedOutcome = {
                name: 'hammer',
                durability: 100,
                enhancement: 12,
            };

            const actualOutcome = enhancer.repair(item);

            expect(actualOutcome.enhancement).toEqual(
                expectedOutcome.enhancement
            );
        });
    });

    describe('succeed', () => {
        it('returns a new item object', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 12,
            };

            const expectedOutcome = {
                name: 'hammer',
                durability: 60,
                enhancement: 13,
            };

            const actualOutcome = enhancer.succeed(item);

            expect(actualOutcome).toEqual(expectedOutcome);
        });

        it('item enhancement is a positive number', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 12,
            };

            const actualOutcome = enhancer.succeed(item);

            expect(actualOutcome.enhancement).toBeGreaterThanOrEqual(0);
        });

        it('item enhancement is not greater than 20', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 12,
            };

            const actualOutcome = enhancer.succeed(item);

            expect(actualOutcome.enhancement).toBeLessThanOrEqual(20);
        });

        it('item enhancement increases by 1', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 12,
            };

            const expectedOutcome = {
                name: 'hammer',
                durability: 60,
                enhancement: 13,
            };

            const actualOutcome = enhancer.succeed(item);

            expect(actualOutcome.enhancement).toBe(expectedOutcome.enhancement);
        });

        it('item enhancement remains 20 if it was initially 20', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 20,
            };

            const expectedOutcome = {
                name: 'hammer',
                durability: 60,
                enhancement: 20,
            };

            const actualOutcome = enhancer.succeed(item);

            expect(actualOutcome.enhancement).toBe(expectedOutcome.enhancement);
        });

        it('item durability is a positive number', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 12,
            };

            const actualOutcome = enhancer.succeed(item);

            expect(actualOutcome.durability).toBeGreaterThanOrEqual(0);
        });

        it('item durability is not changed', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 12,
            };

            const expectedOutcome = {
                name: 'hammer',
                durability: 60,
                enhancement: 13,
            };

            const actualOutcome = enhancer.succeed(item);

            expect(actualOutcome.durability).toEqual(
                expectedOutcome.durability
            );
        });

        it('throws an error if not given an item object with correct structure', () => {
            expect(() => {
                enhancer.fail(5);
            }).toThrow();
            expect(() => {
                enhancer.fail('knife');
            }).toThrow();
            expect(() => {
                enhancer.fail([1, 5, 'sword']);
            }).toThrow();
            expect(() => {
                enhancer.fail({ name: 'bow', durability: 45 });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: 8, durability: 52 });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: 8, durability: -1 });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: 8, durability: 101 });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: 16, name: 'spear' });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: -1, name: 'spear' });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: 21, name: 'spear' });
            }).toThrow();
        });
    });

    describe('fail', () => {
        it('throws an error if not given an item object with correct structure', () => {
            expect(() => {
                enhancer.fail(5);
            }).toThrow();
            expect(() => {
                enhancer.fail('knife');
            }).toThrow();
            expect(() => {
                enhancer.fail([1, 5, 'sword']);
            }).toThrow();
            expect(() => {
                enhancer.fail({ name: 'bow', durability: 45 });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: 8, durability: 52 });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: 8, durability: -1 });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: 8, durability: 101 });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: 16, name: 'spear' });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: -1, name: 'spear' });
            }).toThrow();
            expect(() => {
                enhancer.fail({ enhancement: 21, name: 'spear' });
            }).toThrow();
        });

        it('returns a new item object', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 12,
            };

            const expectedOutcome = {
                name: 'hammer',
                durability: 55,
                enhancement: 12,
            };

            const actualOutcome = enhancer.fail(item);

            expect(actualOutcome).toEqual(expectedOutcome);
        });

        it('item enhancement is a positive number', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 12,
            };

            const actualOutcome = enhancer.fail(item);

            expect(actualOutcome.enhancement).toBeGreaterThanOrEqual(0);
        });

        it('item enhancement is not greater than 20', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 12,
            };

            const actualOutcome = enhancer.fail(item);

            expect(actualOutcome.enhancement).toBeLessThanOrEqual(20);
        });

        it('item durability is a positive number', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 12,
            };

            const actualOutcome = enhancer.fail(item);

            expect(actualOutcome.durability).toBeGreaterThanOrEqual(0);
        });

        it('item durability is not greater than 100', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 12,
            };

            const actualOutcome = enhancer.fail(item);

            expect(actualOutcome.durability).toBeLessThanOrEqual(100);
        });

        it('decrease item durability by 5 if enhancement was less than 15', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 12,
            };

            const actualOutcome = enhancer.fail(item);

            expect(actualOutcome.durability).toBe(55);
        });

        it('decrease item durability by 10 if enhancement was 15 or higher', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 15,
            };

            const actualOutcome = enhancer.fail(item);

            expect(actualOutcome.durability).toBe(50);
        });

        it('decrease item enhancement by 1 if it was greater than 16', () => {
            const item = {
                name: 'hammer',
                durability: 60,
                enhancement: 17,
            };

            const actualOutcome = enhancer.fail(item);

            expect(actualOutcome.enhancement).toBe(16);
        });

        it('throws an error if not given an item object with correct structure', () => {
            expect(() => {
                enhancer.repair(5);
            }).toThrow();
            expect(() => {
                enhancer.repair('knife');
            }).toThrow();
            expect(() => {
                enhancer.repair([1, 5, 'sword']);
            }).toThrow();
            expect(() => {
                enhancer.repair({ name: 'bow', durability: 45 });
            }).toThrow();
            expect(() => {
                enhancer.repair({ enhancement: 8, durability: 52 });
            }).toThrow();
            expect(() => {
                enhancer.repair({ enhancement: 16, name: 'spear' });
            }).toThrow();
        });
    });
});
