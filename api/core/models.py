from django.db import models
import uuid
from django.core import validators

class Pessoa(models.Model):
    id = models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4
    )
    nome = models.CharField(max_length=150)
    dt_nascimento = models.DateField(
        verbose_name='Data de nascimento',
    )
    cpf = models.CharField(
        max_length=14,
        unique=True,
        validators=[
            validators.RegexValidator(
                regex=r'^\d{3}\.\d{3}\.\d{3}-\d{2}$',
                message='O CPF deve estar no formato 999.999.999-99'
            )
        ]
    )
    sexo = models.CharField(
        max_length=1,
        choices=(
            ('M', 'Masculino'),
            ('F', 'Feminino'),
        )
    )
    altura = models.DecimalField(
        max_digits=3,
        decimal_places=2,
    )
    peso = models.DecimalField(
        max_digits=5,
        decimal_places=2,
    )

    def __str__(self):
        return f"{self.nome} - {self.cpf}"

    class Meta:
        verbose_name = 'Pessoa'
        verbose_name_plural = 'Pessoas'
        ordering = ['nome']