import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirPath: "/",
    });
  });
  it("should store the token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirPath: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "some-value",
          userId: "some-id",
        }
      )
    ).toEqual({
      token: "some-value",
      userId: "some-id",
      error: null,
      loading: false,
      authRedirPath: "/",
    });
  });
});
