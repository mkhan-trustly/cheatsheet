# Example code

```
public class Money {
    private final BigDecimal amount;
    private final SupportedCurrency currency;

    public Money(BigDecimal amount, SupportedCurrency currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public SupportedCurrency getCurrency() {
        return currency;
    }
}

public enum SupportedCurrency {
    SEK, DKK
}

public final class NordicCurrency {
    public static final String SEK = "SEK";
    public static final String DKK = "DKK";

    private NordicCurrency() {}
}

MonetaryAmount amount = Money.of(100, "SEK");
MonetaryAmount amount = Money.of(100, "SEK");
```