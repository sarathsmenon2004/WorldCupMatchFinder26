import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isAllowedOutboundUrl } from "../config/affiliates";
import { broadcasterData, getCountry } from "../data/broadcasters";
import { scheduleData } from "../data/schedule";
import { matchToIcs } from "./calendar";
import { countryCodeSchema } from "./validation";

describe("country code validation", () => {
  it("accepts ISO alpha-2 codes and uppercases them", () => {
    assert.equal(countryCodeSchema.parse("us"), "US");
  });

  it("rejects path-like input", () => {
    assert.equal(countryCodeSchema.safeParse("../secret").success, false);
  });
});

describe("broadcaster data policy", () => {
  it("keeps India, Bangladesh, and Pakistan unconfirmed", () => {
    for (const code of ["IN", "BD", "PK"]) {
      const country = getCountry(code);
      assert.equal(country?.hasConfirmed, false);
      assert.equal(country?.status, "unconfirmed");
      assert.equal(country?.broadcasters.length, 0);
    }
  });

  it("has source metadata on every country", () => {
    assert.equal(
      broadcasterData.every((country) => country.sourceUrl.startsWith("https://")),
      true,
    );
    assert.equal(broadcasterData.every((country) => country.lastVerifiedAt), true);
  });
});

describe("schedule data", () => {
  it("contains all 104 matches", () => {
    assert.equal(scheduleData.length, 104);
  });

  it("can filter group stage matches", () => {
    assert.equal(
      scheduleData.filter((match) => match.phase === "Group Stage").length,
      72,
    );
  });
});

describe("calendar generation", () => {
  it("creates an ics event", () => {
    const ics = matchToIcs(scheduleData[0]);
    assert.equal(ics.includes("BEGIN:VCALENDAR"), true);
    assert.equal(ics.includes("SUMMARY:Mexico vs South Africa"), true);
  });
});

describe("outbound links", () => {
  it("only allows https urls", () => {
    assert.equal(isAllowedOutboundUrl("https://example.com"), true);
    assert.equal(isAllowedOutboundUrl("javascript:alert(1)"), false);
    assert.equal(isAllowedOutboundUrl("http://example.com"), false);
  });
});
