.PHONY: clean-code
clean-code:
	@echo "Setting up APP Code."
	cd app && yarn clean

	@echo "Setting up ORM Code."
	cd orm && yarn clean
