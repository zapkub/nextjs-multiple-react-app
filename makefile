
prepare:
	yarn install
	cd modules/core&&yarn install

demo:
	stmux [ " yarn next " : " cd modules/core&&yarn dev " ]