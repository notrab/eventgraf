# EventGraf

## Clerk

```bash
# grafbase/.env
CLERK_ISSUER_URL=
```

### JWT Template

```json
{
  "groups": ["{{user.public_metadata.role}}"]
}
```
