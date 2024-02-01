.PHONY: *


build:
	npm run build

v-patch:
	npm version patch

v-minor:
	npm version minor

v-major:
	npm version major

publish:
	npm publish && git push

publish-patch: v-patch publish

publish-minor: v-minor publish

publish-major: v-major publish

link:
	bun link

test:
	npm run test

coverage:
	npm run coverage

lint:
	npm run lint

format:
	npm run format