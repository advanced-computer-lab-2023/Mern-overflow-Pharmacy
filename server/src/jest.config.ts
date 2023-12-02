import type { Config } from "jest";

module.exports = {
    verbose: true,
    testEnvironment: "node",
    testMatch: ["./tests/**/*.test.ts"],
    moduleFileExtensions: ["ts", "js", "json", "node"],
    transform: {
        "^.+\\.ts$": "babel-jest"
    },
    setupFilesAfterEnv: ["/home/nighthawk/Programming/GUC/Mern-overflow/server/src/Tests/setupTests.ts"]
};
