# AT Pro Svelte Example

This is a rewrite of the oauth sample app to use Svelte instead of React and NextJS.

Original code: https://atproto.com/guides/oauth-tutorial

## Install

```
npm i
```

## Notes

Note about `localhost`: Sveltekit wants to use localhost for the dev server, but this causes problems with the oauth redirect. For that reason this app forces the use of 127.0.0.1.
