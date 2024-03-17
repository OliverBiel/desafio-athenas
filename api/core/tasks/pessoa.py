from core.models import Pessoa


class PessoaTask:
    def create_person(self, dados):
        pessoa = Pessoa.objects.create(**dados)
        return pessoa

    def change_person(self, pessoa_id, dados):
        pessoa = Pessoa.objects.get(pk=pessoa_id)
        for attr, value in dados.items():
            setattr(pessoa, attr, value)
        pessoa.save()
        return pessoa

    def delete_person(self, pessoa_id):
        pessoa = Pessoa.objects.get(pk=pessoa_id)
        pessoa.delete()
    
    def get_person(self, pessoa_id):
        return Pessoa.objects.get(pk=pessoa_id)

    def list_person(self):
        return Pessoa.objects.all()
    