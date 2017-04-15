import {ParseOptions, Path, RegExpOptions} from "path-to-regexp";

/**
 * Get a route function configured with the given options
 * @param options Path matching options passed to path-to-regexp
 */
declare function pathMatch (options?: RegExpOptions & ParseOptions): pathMatch.RouteFunction;

declare namespace pathMatch {

  export type ParamsMap = {
      [key: string]: string | string[];
  }

  /**
   * Matches a path agains its path pattern
   * @returns false if the given path didn't match the function's path pattern,
   * otherwise it returns a paramName -> paramValue map of the matched
   * parameters
   */
  export type MatchFunction = (pathname: string, params?: object) => false | ParamsMap;

  /**
   * Get a match function for the given path pattern
   */
  export type RouteFunction = (path: Path) => MatchFunction;

}

export = pathMatch;
