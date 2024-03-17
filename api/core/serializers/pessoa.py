from rest_framework import serializers
from core.models import Pessoa


class PessoaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pessoa
        fields = ["id", "nome", "dt_nascimento", "cpf", "sexo", "altura", "peso",]