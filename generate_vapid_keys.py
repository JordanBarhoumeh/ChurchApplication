from pywebpush import generate_vapid_key

private_key, public_key = generate_vapid_key()
print("Public Key:", public_key)
print("Private Key:", private_key)
